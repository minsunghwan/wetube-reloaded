import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }

  return res.render("watch", { pageTitle: video.title, video: video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files; //path를 얻어 fileUrl 대입 -es6
  const { title, hashtags, description } = req.body;
  try {
    // const newVideo = await Video.create({
    //   title,
    //   description,
    //   fileUrl: video[0].path,
    //   thumbUrl: thumb[0].path,
    //   hashtags: Video.formatHashtags(hashtags),
    //   owner: _id,
    // });

    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path.replace(/\\/g, "/"), // 경로의 역슬래시 문제 해결
      thumbUrl: thumb[0].path.replace(/\\/g, "/"), // 경로의 역슬래시 문제 해결
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error.message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  const {
    user: { _id },
  } = req.session;

  const video = await Video.findById(id);
  const user = await User.findById(_id);

  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
    return res.render("search", { pageTitle: "Search", videos });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404);
  }

  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.status(200);
};
