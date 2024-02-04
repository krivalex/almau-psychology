<template>
  <section class="no-access">
    <div class="container">
      <h1 class="title">Ай-ай-ай, а у вас нет сюда доступа👮</h1>
      <p class="text">Не надо так делать</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.no-access {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86vh;
  color: black;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;

    .title {
      font-size: 2rem;
    }
    .text {
      font-size: 1.5rem;
    }
  }
}
</style>
