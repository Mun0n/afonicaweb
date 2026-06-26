{**
 * Afónica — product card (store mockup)
 *}
{block name='product_miniature_item'}
  {assign var='afonica_back' value=null}
  {if isset($product.images) && $product.images|@count > 1}
    {foreach from=$product.images item=image}
      {if !empty($product.cover.id_image) && $image.id_image != $product.cover.id_image}
        {assign var='afonica_back' value=$image}
        {break}
      {/if}
    {/foreach}
  {/if}

  <div class="js-product product{if !empty($productClasses)} {$productClasses}{/if}">
    <article
      class="product-miniature afonica-card js-product-miniature{if $afonica_back} js-afonica-flip-card{/if}"
      data-id-product="{$product.id_product}"
      data-id-product-attribute="{$product.id_product_attribute}"
    >
      <a href="{$product.url}" class="afonica-card__media-link" tabindex="-1" aria-hidden="true">
        <div
          class="afonica-card__media"
          style="position:relative;width:100%;aspect-ratio:1/1;overflow:hidden;background:#0f0f0f;"
        >
          {if $product.cover}
            <img
              class="afonica-card__img afonica-card__img--front"
              src="{$product.cover.bySize.home_default.url}"
              alt="{$product.name|escape:'html':'UTF-8'}"
              loading="lazy"
              width="{$product.cover.bySize.home_default.width}"
              height="{$product.cover.bySize.home_default.height}"
              style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;max-width:none;margin:0;padding:0.75rem;border:0;"
            />
          {/if}

          {if $afonica_back}
            <img
              class="afonica-card__img afonica-card__img--back"
              src="{$afonica_back.bySize.home_default.url}"
              alt="{$product.name|escape:'html':'UTF-8'} — trasera"
              loading="lazy"
              width="{$afonica_back.bySize.home_default.width}"
              height="{$afonica_back.bySize.home_default.height}"
              style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;max-width:none;margin:0;padding:0.75rem;border:0;opacity:0;"
            />
          {/if}
        </div>
      </a>

      <div class="afonica-card__body">
        <h3 class="afonica-card__title">
          <a href="{$product.url}">{$product.name}</a>
        </h3>

        {if $product.show_price}
          <p class="afonica-card__price">{$product.price}</p>
          <a href="{$product.url}" class="afonica-card__btn">Añadir al carrito</a>
        {/if}
      </div>
    </article>
  </div>
{/block}
