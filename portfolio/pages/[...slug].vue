<template onload="startAnimation()">
  <main>
    <header>
      <h3 class="welcome">Herzlich Willkommen!</h3>
      <h3 class="typewrite" data-period="2000" type='["Ich bin Schüler.", "Ich bin Software Entwickler.", "Ich bin Designer.", "Ich bin Gründer."]'></h3>
      <span class="wrap"></span>
    </header>
    <ContentDoc />
    <footer>
      <p>&copy;2023 Nathanael Kim</p>
    </footer>
  </main>
</template>
<script setup>
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = none;
  this.tick();
  this.isDeleting = false;
}
TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if(this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length -1);
  }else {
    this.txt = fullTxt.substring(0, this.txt.length +1);
  }
  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  var that = this;
  var delta = 200 - Math.random() * 100;

  if(this.isDeleting) {delta /= 2;}
  if(!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeletin = true;
  }else if (this.isDeletin && this.txt === '') {
    this.isDeletin = false;
    this.loopNum++;
    delta = 500;
  }
  setTimeout(function() {
    that.tick();
  }, delta);

  function startAnimation() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if(toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap {border-right: 0.08em solid #000}";
    document.body.appendChild(css);
  }
}
</script>