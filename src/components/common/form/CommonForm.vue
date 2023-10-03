<template>
  <form @submit.prevent="$emit('proceedAction')">
    <slot />
    <SaveBtn />
  </form>
</template>
