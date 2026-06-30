{extends file='parent:index.tpl'}

{block name='page_content_top'}
  <section class="afonica-hero" aria-label="Afónica Naranjo Merch Oficial">
    <div class="afonica-hero__overlay"></div>
    <div class="container afonica-hero__content">
      <p class="afonica-hero__eyebrow">Merch Oficial</p>
      <h1 class="afonica-hero__title">Afónica Naranjo</h1>
    </div>
  </section>
{/block}

{block name='page_content'}
  {block name='page_content_top'}{/block}
  {widget name='ps_featuredproducts'}
  {block name='page_content_bottom'}{/block}
{/block}
