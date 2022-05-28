<template>
  <div class="container">
    
      <slot name="input"> 
      <div class="form-item">
        <label class="form-label">項目</label>
        <input class="form-input" required />
      </div>
      </slot>
    
  </div>
</template>

<script>
export default {
name: 'InputForm'  
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/basic.scss";
.form-item {
  @extend %input-block;
  display: flex;
  flex-flow: column nowrap;
  margin: 32px 0 8px 0;
  .form-label {
    @extend %form-label;
  }
  input {
    @extend %form-input;
    border: none;
    background: $form-input-grey;
    &:focus{
    background: transparent;
    @extend %focus;
  }
  }
  input::placeholder {
    color: $form-input-placeholder;
  }
  &::after {
    content: "";
    @extend %input-bottom;
  }
  &:hover::after{
    background: transparent;
    @extend %focus;
  }
}
</style>