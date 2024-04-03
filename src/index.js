/*
        jangan ubah kode di bawah ini ya!
*/
import anime from "animejs/lib/anime.es.js";
import "./scripts/layouts/layouts.js";
import "regenerator-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import main from "./scripts/main";

anime({
  targets: ".catatan ",
  translateX: 100,
  direction: "alternate",
  easing: "easeInOutSine",
});

main();
