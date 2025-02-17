<template>
  <div class="app-container">
    <header>
      <h1>Random User API Exercise</h1>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  font-family: 'Lexend Giga', serif;
  min-height: 100vh;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

header {
  background: black;
  color: white;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

main {
  width: 90%;
  max-width: 800px;
  background: white;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
