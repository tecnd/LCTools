<script lang="ts">
  import type { Category, Tag } from "$lib/cards";
  import { cards, categories, tags } from "$lib/cards";
  import { flip } from "svelte/animate";

  const VERSION = __APP_VERSION__;
  const BUILD_TIME = __APP_BUILD_TIME__;
  const MAX_COST = 5;

  let costFilter = MAX_COST;
  let categoryFilter: Category[] = [];
  let tagFilter: Tag[] = [];

  $: filteredCards = cards.filter((card) => {
    const costCheck = card.cost <= costFilter;
    const categoryCheck =
      categoryFilter.length === 0
        ? true
        : categoryFilter.includes(card.category);
    const tagCheck =
      tagFilter.length === 0
        ? true
        : !card.tags
          ? false
          : card.tags.some((tag) => tagFilter.includes(tag));
    return costCheck && categoryCheck && tagCheck;
  });
</script>

<div class="sticky top-0 bg-white p-1">
  <h1 class="text-2xl">
    LCTools <span class="text-base">{VERSION} built on {BUILD_TIME}</span>
  </h1>
  <div class="flex">
    <input
      type="range"
      min="0"
      max={MAX_COST}
      step="1"
      list="markers"
      bind:value={costFilter}
    />
    <span class="ml-1">{costFilter}</span>
  </div>
  <datalist id="markers">
    {#each [...Array(MAX_COST + 1).keys()] as value}
      <option {value} />
    {/each}
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
    <button class="bg-slate-400" on:click={() => (tagFilter = [])}>Clear</button
    >
  </div>
</div>

<div class="xl:grid xl:grid-cols-2">
  {#each filteredCards as card (card.faction + card.name)}
    <div class="m-1 outline outline-1" animate:flip={{ duration: 500 }}>
      <p>{`(${card.cost}) ${card.name}`}</p>
      <div class="flex">
        <div class="w-64 flex-none">
          <enhanced:img src={card.image} alt={card.name} title={card.name} />
        </div>
        <div class="mx-1">
          <p>Faction: {card.faction}</p>
          <p>Cost: {card.cost}</p>
          <p>Availability: {card.availability}</p>
          <p>Category: {card.category}</p>
          <hr class="my-1" />
          <p>{@html card.cardText}</p>
          {#if card.tags}
            <hr class="my-1" />
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
</div>
