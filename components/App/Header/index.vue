<template>
  <header>
    <div class="container">
      <nav>
        <ul>
          <li v-for="link in MENU_LIST" :key="link.label">
            <nuxt-link :to="link.to" active-class="active">
              {{ link.label }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  </header>
</template>

<style scoped>
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

ul li {
  font-size: 18px;
  font-weight: bold;
}

li:hover {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: white;
  font-weight: 400;
}

.active {
  font-weight: 800;
}
</style>
