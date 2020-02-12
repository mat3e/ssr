import Vue from 'vue';

export default Vue.extend({
  template: `
    <div>
      <form @submit.prevent="search">
        <input type="search" v-model.trim.lazy="toSearch" />
        <button @click.prevent="search">Search</button>
      </form>
      <hr>
    </div>
  `,
  props: {
    input: {
      type: String
    }
  },
  data() {
    return {
      toSearch: this.input
    };
  },
  methods: {
    search() {
      const event = new CustomEvent('search:changed', {
        detail: this.toSearch
      });
      document.dispatchEvent(event);
    }
  }
});
