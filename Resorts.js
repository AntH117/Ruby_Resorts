window.onload = function() {
  function collaspe() {
    const subs = document.getElementById('subs');
    var viewerWidth = window.innerWidth;
    if (viewerWidth <= 1000) {
      subs.style.display = 'none'
    } else {
      subs.style.display = 'flex'
    }
  }

  let scrollPos = 0;
  
  function handleScroll(event) {
    const header = document.getElementById('header')
    header.style.height = "85px"

    if (window.scrollY > this.scrollPos) {
      header.style.top = "-85px"
      header.style.backgroundColor = 'rgba(252, 250, 250, 0)'
    } else {
      header.style.top = "0px"
      header.style.display = "flex"
      header.style.backgroundColor = "white"
    }
  
    this.scrollPos = window.scrollY;
  }
  
  function handleMouseMove(event) {
    const cursorY = event.clientY;
    const threshold = 200;
    const header = document.getElementById('header')
    if (cursorY <= threshold) {
      header.style.top = "0px"
      header.style.display = "flex"
      header.style.backgroundColor = "white"
    }
  }
  const myDiv = document.getElementById('avaliabiliyMore')
  const overlayDiv = document.getElementById('overlayBody')
  overlayDiv.style.left = "100%";
  function overlay() {
   if (overlayDiv.style.left == "100%") {
    overlayDiv.style.left = 0;
   } else {
    overlayDiv.style.left = "100%";
   }
  }

  function arrow(event, direction) {
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');
    if (direction === "left") {
      arrowLeft.style.borderRightColor = 'white';
    } else {
      arrowRight.style.borderLeftColor = 'white';
    }
  }
  function arrowOut() {
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');
    arrowRight.style.borderLeftColor = 'black';
    arrowLeft.style.borderRightColor = 'black';
  }
  
  const leftDiv = document.getElementById('cascadingLeft');
  const rightDiv = document.getElementById('cascadingRight');
  leftDiv.addEventListener('mouseover', function(event) {
    arrow(event, "left");
  });
  rightDiv.addEventListener('mouseover', function(event) {
    arrow(event, "right");
  });
  leftDiv.addEventListener('mouseout',arrowOut)
  rightDiv.addEventListener('mouseout',arrowOut)
  myDiv.addEventListener('click', overlay);
  window.addEventListener('scroll', handleScroll);

  window.addEventListener('resize', collaspe);
  window.addEventListener('mousemove', handleMouseMove);

  currentBox = 0;
  const boxes = document.getElementsByClassName('cascadingBox')
  for (let i = 1; i < boxes.length; i++) {
    boxes[i].style.display = 'none';
  }
  boxes[(boxes.length -1)].style.left = '-100%'; 
  boxes[boxes.length -1].style.display = 'none';
  boxes[1].style.left = '135%'; 
  boxes[1].style.display = 'none';
  setTimeout(() => {
    boxes[1].style.display = 'flex';
    boxes[boxes.length -1].style.display = 'flex';
  }, 400);

  let canClick = true;
  function cascadingLoop(move) {
    if (canClick) {
      if (move === 'right') {
        if (currentBox + 1 >= boxes.length){
          boxes[currentBox].style.left = '-100%';
          boxes[0].style.left = '35%';
          currentBox = 0;
          boxes[currentBox + 1].style.left = '135%';
          boxes[currentBox + 1].style.display = 'flex';
          boxes[boxes.length - 2].style.display = 'none';
        } else {
          boxes[currentBox].style.left = '-100%';
          boxes[currentBox + 1].style.left = '35%';
          currentBox += 1;
          if (currentBox - 2 < 0) {
            boxes[boxes.length - 1].style.display = 'none';
            boxes[currentBox + 1].style.left = '135%';
            boxes[currentBox + 1].style.display = 'flex';
          } else if (currentBox + 1 >= boxes.length) {
            boxes[currentBox - 2].style.display = 'none';
            boxes[0].style.left = '135%';
            boxes[0].style.display = 'flex';
          }
           else {
            boxes[currentBox - 2].style.display = 'none';
            boxes[currentBox + 1].style.left = '135%';
            boxes[currentBox + 1].style.display = 'flex';
          }
        }
      } else if (move === 'left') {
        if (currentBox - 1 > 0) {
          boxes[currentBox].style.left = '135%'
          boxes[currentBox - 1].style.left = '35%'
          currentBox -= 1;
          if (currentBox + 2 >= boxes.length) {
            boxes[0].style.display = 'none'
          } else {
            boxes[currentBox + 2].style.display = 'none'
          }
          boxes[currentBox - 1].style.left = '-100%';
          boxes[currentBox - 1].style.display = 'flex';
        } else if (currentBox -1 === 0) {
          boxes[currentBox].style.left = '135%'
          boxes[currentBox - 1].style.left = '35%'
          boxes[currentBox + 1].style.display = 'none'
          currentBox -= 1;
          boxes[boxes.length - 1].style.left = '-100%';
          boxes[boxes.length - 1].style.display = 'flex';
        }
        else {
          boxes[currentBox].style.left = '135%'
          boxes[boxes.length - 1].style.left = '35%'
          boxes[1].style.display = 'none';
          currentBox = (boxes.length - 1);
          boxes[currentBox - 1].style.left = '-100%';
          boxes[currentBox - 1].style.display = 'flex';
        }
      }
      canClick = false;
      setTimeout(() => {
        canClick = true;
      }, 700);
    } 
   }

  leftDiv.addEventListener('mousedown', function(event) {
    cascadingLoop('left');
  });
  
  rightDiv.addEventListener('mousedown', function(event) {
    cascadingLoop('right');
  });
}