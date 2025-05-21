const imageInput = document.getElementById('imageInput');
const memeCanvas = document.getElementById('memeCanvas');
const ctx = memeCanvas.getContext('2d');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const downloadBtn = document.getElementById('downloadBtn');

let memeImage = new Image();

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      memeImage.onload = function() {
        memeCanvas.width = memeImage.width;
        memeCanvas.height = memeImage.height;
        ctx.drawImage(memeImage, 0, 0);
        drawText();
      };
      memeImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function drawText() {
  ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
  ctx.drawImage(memeImage, 0, 0);

  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  ctx.font = '40px Impact';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.lineWidth = 2;

  if (topText) {
    ctx.fillText(topText, memeCanvas.width / 2, 10);
  }

  if (bottomText) {
    ctx.textBaseline = 'bottom';
    ctx.fillText(bottomText, memeCanvas.width / 2, memeCanvas.height - 10);
  }
}

topTextInput.addEventListener('input', drawText);
bottomTextInput.addEventListener('input', drawText);

downloadBtn.addEventListener('click', () => {
  const dataUrl = memeCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'meme.png';
  a.click();
});
