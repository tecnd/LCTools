<script lang="ts">
  import type { Category, Tag } from "$lib/cards";
  import { cards, categories, tags } from "$lib/cards";
  import { flip } from "svelte/animate";

  let costFilter = 5;
  let categoryFilter: Category[] = [];
  let tagFilter: Tag[] = [];
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

<div>
  {#each categories as category}
    <label class="mr-1">
      <input
        type="checkbox"
        value={category}
        name="categoryFilter"
        bind:group={categoryFilter}
      />
      {category}
    </label>
  {/each}
  <button class="bg-slate-400" on:click={() => (categoryFilter = [])}
    >Clear</button
  >
</div>

<div>
  {#each Object.keys(tags) as tag}
    <label class="mr-1">
      <input
        type="checkbox"
        value={tag}
        name="tagFilter"
        bind:group={tagFilter}
      />
      {tag}
    </label>
  {/each}
  <button class="bg-slate-400" on:click={() => (tagFilter = [])}>Clear</button>
</div>

<!-- TODO: refactor filtering to be one-pass -->
{#each cards
  .filter((card) => card.cost <= costFilter)
  .filter((card) => {
    if (categoryFilter.length === 0) {
      return true;
    }
    return categoryFilter.includes(card.category);
  })
  .filter((card) => {
    if (tagFilter.length === 0) {
      return true;
    }
    if (!card.tags) {
      return false;
    }
    return card.tags.some((tag) => tagFilter.includes(tag));
  }) as card (card.faction + card.name)}
  <div class="my-1 outline outline-1" animate:flip={{ duration: 500 }}>
    <p>{`(${card.cost}) ${card.name}`}</p>
    <div class="flex">
      <div>
        <enhanced:img
          src={card.image}
          alt={card.name}
          title={card.name}
          class="w-64"
        />
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
          <p>
            Tags:
            {#each card.tags as tag}
              <span
                class="cursor-help underline decoration-dotted after:mr-1 after:content-[','] last:after:content-none"
                title={tags[tag]}>{tag}</span
              >
            {/each}
          </p>
        {/if}
      </div>
    </div>
  </div>
{/each}
