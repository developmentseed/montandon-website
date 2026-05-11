<template>
  <div class="hero-video">
    <iframe
      src="https://www.youtube.com/embed/BEWxqYfrQek?si=B71YrLWsoTdD9dgM"
      title="Montandon Overview"
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.hero-video {
  width: 100%;
  max-width: 480px;
}

.hero-video iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  border: none;
}

@media (min-width: 960px) {
  .hero-video {
    padding-left: 32px;
  }
}
</style>

<style>
@media (max-width: 959px) {
  .VPHero .image {
    order: 3;
    margin-top: 24px;
  }
}

.VPHero .image-bg {
  pointer-events: none;
}

@media (min-width: 960px) {
  .VPHero .image-container {
    transform: none;
  }

  .VPHero .image {
    position: relative;
    z-index: 20;
  }
}
</style>
