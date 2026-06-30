{extends file='parent:_partials/header.tpl'}

{block name='header_banner'}
  <div class="afonica-utility-bar">
    <div class="container afonica-utility-bar__inner">
      <div class="afonica-utility-bar__left">
        <a href="{$urls.pages.contact}">Contacto</a>
        <span class="afonica-utility-bar__sep" aria-hidden="true">·</span>
        <span>Envíos a toda España</span>
        <span class="afonica-utility-bar__sep afonica-utility-bar__sep--desktop" aria-hidden="true">·</span>
        <a class="afonica-utility-bar__back afonica-utility-bar__back--desktop" href="https://www.afonicanaranjo.com">← Web</a>
      </div>
    </div>
  </div>
  {$smarty.block.parent}
{/block}
