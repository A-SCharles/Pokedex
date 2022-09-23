<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="'effect' + ability.ability.name"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ ability.ability.name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-start">
          <div v-if="abilitys">
            <p>
              Description: {{ abilitys.flavor_text_entries[0].flavor_text }}
            </p>
            <p>Effect Entry: {{ abilitys.effect_entries.effect }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ability"],
  computed: {
    abilitys() {
      return this.$store.state.ability;
    },
  },
};
</script>

<style></style>
