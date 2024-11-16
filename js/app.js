const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,
  yValue = 0;
let rotateDegree = 0;

const update = function (cursorPosition) {
  parallax_el.forEach((el) => {
    let speedX = el.dataset.speedx;
    let speedY = el.dataset.speedy;
    let speedZ = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeftSide =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1; //проверка на левую или правую часть для увеличения или уменьшения объекта
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) *
      isInLeftSide *
      0.1;

    el.style.transform = `perspective(2300px) translateZ(${
      zValue * speedZ
    }px) rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${
      xValue * speedX
    }px)) translateY(calc(-50% + ${yValue * speedY}px))`;
  });
};

update(0);

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

// GSAP Animation

let timeline = gsap.timeline();

setTimeout(() => {
  parallax_el.forEach((el) => {
    el.style.transition = "0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99)";
  });
}, timeline.endTime() * 1000);

Array.from(parallax_el)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration: 2.5,
        ease: "power3.out",
      },
      "1"
    );
  });

timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 0.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 0.5,
    },
    "3"
  );
