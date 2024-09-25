const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";

  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};
const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    console.log(video);
  };

  recorder.start();
};

const init = async () => {
  try {
    // 장치 목록을 확인하여 비디오가 있는지 여부를 파악
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasVideoInput = devices.some(
      (device) => device.kind === "videoinput"
    );
    const hasAudioInput = devices.some(
      (device) => device.kind === "audioinput"
    );

    // 비디오 장치가 없는 경우, 비디오 요청을 하지 않음
    const constraints = {
      audio: hasAudioInput ? true : false,
      video: hasVideoInput ? true : false,
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);

    video.srcObject = stream;
    video.play();

    video.style, (width = "540px");
    video.style, (height = "380px");

    if (!hasAudioInput && !hasVideoInput) {
      console.warn(
        "마이크와 카메라가 모두 없습니다. 오디오 및 비디오를 사용할 수 없습니다."
      );
    } else {
      if (!hasVideoInput) {
        console.warn("카메라가 없습니다. 오디오만 사용할 수 있습니다.");
      }
      if (!hasAudioInput) {
        console.warn("마이크가 없습니다. 오디오를 사용할 수 없습니다.");
      }
    }
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
};

init();

startBtn.addEventListener("click", handleStart);
