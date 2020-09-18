addEventListener("load", function () {
  // Variables
  let whiteboardColor = "#FFFFFF";
  var a;
  var drawing;
  var lineType = "round";
  var lineColor = "black";
  var lineWidth = 10;

  //
  //
  document.querySelector("#color").addEventListener("input", function () {
    lineColor = document.querySelector("#color").value;
  });
  document.querySelector("#range").addEventListener("input", function () {
    lineWidth = document.querySelector("#range").value;
  });
  //

  //
  //
  document.getElementById("value").innerHTML =
    "(" + document.getElementById("range").value + ")";

  const canvas = document.getElementById("whiteboard");
  const ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight - 150;
  canvas.width = window.innerWidth - 10;
  document.getElementById("whiteboard").style.backgroundColor = whiteboardColor;

  // Resizing Canvas on every resizing
  // addEventListener("resize", function () {
  //   canvas.height = window.innerHeight - 150;
  //   canvas.width = window.innerWidth - 10;
  // });

  document.getElementById("image").addEventListener("change", function (event) {
    drawing = false;
    var path = URL.createObjectURL(event.target.files[0]);
    // console.log(typeof path);
    images(path);
  });

  function images(path) {
    var img = new Image();
    img.onload = function () {
      scaleToFit(this);
    };

    img.onerror = function () {
      alert(img.src + " failed to load.");
    };
    img.src = path;
    function scaleToFit(img) {
      // get the scale
      var scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      // get the top left position of the image
      var x = canvas.width / 2 - (img.width / 2) * scale;
      var y = canvas.height / 2 - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
    var imgCount = 1;
    // start is called every time an image loads

    // All the images are now successfully loaded
    // context.drawImage will successfully draw each one
    ctx.drawImage(img, 600, 100);
  }
  // Square Shapes
  document.getElementById("square").addEventListener("click", function () {
    drawing = false;
    // document.getElementById("square-checkbox").checked;
    if (document.getElementById("square-checkbox").checked) {
      document.getElementById("square").style.borderColor = "rgb(62, 187, 245)";
      document.getElementById("square-checkbox").checked = false;
    } else {
      document.getElementById("square").style.borderColor = "red";
      document.getElementById("square-checkbox").checked = true;
    }
    addEventListener("mousedown", function (e) {
      if (document.getElementById("square-checkbox").checked) {
        drawing = false;
        ctx.strokeRect(e.clientX - 5, e.clientY - 50, 200, 200);
      }
    });
  });
  //Circle
  document.getElementById("circle").addEventListener("click", function () {
    drawing = false;
    // document.getElementById("circle-checkbox").checked;
    if (document.getElementById("circle-checkbox").checked) {
      document.getElementById("circle").style.borderColor = "rgb(62, 187, 245)";
      document.getElementById("circle-checkbox").checked = false;
    } else {
      document.getElementById("circle").style.borderColor = "red";
      document.getElementById("circle-checkbox").checked = true;
    }
    addEventListener("mousedown", function (e) {
      if (document.getElementById("circle-checkbox").checked) {
        drawing = false;
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY + 50, 100, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });
  });

  //
  //

  function draw() {
    function startDrawing(e) {
      drawing = true;
      draw(e);
    }
    function stopDrawing() {
      drawing = false;
      ctx.beginPath();
    }

    function draw(e) {
      if (!drawing) return;
      ctx.lineWidth = lineWidth - 1;
      ctx.lineCap = lineType;
      ctx.strokeStyle = lineColor;
      ctx.lineTo(e.clientX - 5, e.clientY - 50);
      ctx.stroke();
    }

    addEventListener("mousedown", startDrawing);
    addEventListener("mouseup", stopDrawing);
    addEventListener("mousemove", draw);
  }
  draw();

  document.getElementById("fullscreen").addEventListener("click", function () {
    drawing = false;
    if (!document.fullscreenElement) {
      drawing = false;
      document.documentElement.requestFullscreen();
    } else {
      drawing = false;
      document.exitFullscreen();
    }

    document.getElementById(
      "whiteboard"
    ).style.backgroundColor = whiteboardColor;
  });
  document.querySelector("#clearAll").addEventListener("click", function () {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  });
  document.querySelector("#range").addEventListener("input", function () {
    lineWidth = document.querySelector("#range").value;
    document.getElementById("value").innerHTML = "(" + lineWidth + ")";
  });
  // Erasing Content
  // if()
});
