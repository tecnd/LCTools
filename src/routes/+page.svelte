<script lang="ts">
  import { flip } from "svelte/animate";
  import cards from "$lib/cards";
  let costFilter = 5;
</script>

<h1 class="text-2xl">LCTools</h1>
<div class="flex">
  <input
    type="range"
    min="0"
    max="5"
    step="1"
    list="markers"
    bind:value={costFilter}
  />
  <span class="ml-1">{costFilter}</span>
</div>
<datalist id="markers">
  <option value="0" />
  <option value="1" />
  <option value="2" />
  <option value="3" />
  <option value="4" />
  <option value="5" />
</datalist>

{#each cards.filter((card) => card.cost <= costFilter) as card (card.faction + card.name)}
  <div animate:flip={{ duration: 500 }}>
    <p>{`(${card.cost}) ${card.name}`}</p>
    <div class="flex">
      <div>
        <enhanced:img src={card.image} alt={card.name} class="w-64" />
      </div>
      <div class="ml-1 w-96">
        <p>Faction: {card.faction}</p>
        <p>Cost: {card.cost}</p>
        <p>Availability: {card.availability}</p>
        <p>Category: {card.category}</p>
        <hr />
        <p>{@html card.cardText}</p>
        {#if card.tags}
          <hr />
          <p>Tags: {card.tags.join(", ")}</p>
        {/if}
      </div>
    </div>
  </div>
{/each}
