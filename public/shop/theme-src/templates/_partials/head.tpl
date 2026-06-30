{extends file='parent:_partials/head.tpl'}

{block name='stylesheets' append}
  <link rel="stylesheet" href="https://afonicanaranjo.com/shop/afonica-live-patch.css?v=1.2.5" type="text/css" media="all">
  <link rel="stylesheet" href="{$urls.child_css_url}afonica-dark.css?v=1.2.5" type="text/css" media="all">
{/block}

{block name='javascript_head' append}
  <script src="{$urls.child_js_url}afonica-shop.js?v=1.2.5" defer></script>
{/block}
