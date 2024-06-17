<script lang="ts">
  import cards from "$lib/cards";
</script>

<h1>Welcome to SvelteKit</h1>
<p class="text-3xl">
  Visit <a href="https://kit.svelte.dev" class="text-blue-400">kit.svelte.dev</a
  > to read the documentation
</p>

{#each cards as card}
  <p>{`${card.name} (${card.cost})`}</p>
  <div class="flex">
    <div>
      <enhanced:img src={card.image} alt={card.name} class="w-48" />
    </div>
    <div class="ml-1">
      {#if card.tags}
        <p>{card.tags.join(', ')}</p>
      {/if}
      <p>Look! Some text!</p>
    </div>
  </div>
{/each}
