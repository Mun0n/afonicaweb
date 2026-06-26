{extends file='parent:_partials/footer.tpl'}

{block name='hook_footer_before'}
  <div class="afonica-trust">
    <div class="container afonica-trust__grid">
      <div class="afonica-trust__item">
        <span class="afonica-trust__icon" aria-hidden="true">🚚</span>
        <div>
          <p class="afonica-trust__title">Envíos rápidos</p>
          <p class="afonica-trust__text">2–5 días laborales</p>
        </div>
      </div>
      <div class="afonica-trust__item">
        <span class="afonica-trust__icon" aria-hidden="true">🔒</span>
        <div>
          <p class="afonica-trust__title">Pago seguro</p>
          <p class="afonica-trust__text">100% confianza</p>
        </div>
      </div>
      <div class="afonica-trust__item">
        <span class="afonica-trust__icon" aria-hidden="true">✓</span>
        <div>
          <p class="afonica-trust__title">Productos oficiales</p>
          <p class="afonica-trust__text">Merch 100% original</p>
        </div>
      </div>
      <div class="afonica-trust__item">
        <span class="afonica-trust__icon" aria-hidden="true">💬</span>
        <div>
          <p class="afonica-trust__title">Atención al cliente</p>
          <p class="afonica-trust__text">¿Necesitas ayuda?</p>
        </div>
      </div>
    </div>
  </div>
{/block}

{block name='hook_footer'}
  <div class="afonica-footer">
    <div class="container">
      <div class="afonica-footer__grid">
        <div class="afonica-footer__col">
          <p class="afonica-footer__brand">Afónica Naranjo</p>
          <a class="afonica-footer__back" href="https://www.afonicanaranjo.com">← Volver a la web</a>
        </div>

        <div class="afonica-footer__col">
          <p class="afonica-footer__label">Tienda</p>
          <ul class="afonica-footer__links">
            <li><a href="{$urls.pages.category}">Camisetas</a></li>
            <li><a href="{$urls.pages.contact}">{l s='Contact us' d='Shop.Theme.Global'}</a></li>
          </ul>
        </div>

        <div class="afonica-footer__col">
          <p class="afonica-footer__label">Legal</p>
          <ul class="afonica-footer__links">
            <li><a href="{$urls.pages.cms}">{l s='Legal Notice' d='Shop.Theme.Global'}</a></li>
            <li><a href="{$urls.pages.contact}">{l s='Terms and conditions' d='Shop.Theme.Checkout'}</a></li>
          </ul>
        </div>

        <div class="afonica-footer__col">
          <p class="afonica-footer__label">Contacto</p>
          <ul class="afonica-footer__links">
            <li><a href="mailto:afonicanaranjo@gmail.com">afonicanaranjo@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
{/block}

{block name='hook_footer_after'}{/block}
{block name='copyright_link'}{/block}
