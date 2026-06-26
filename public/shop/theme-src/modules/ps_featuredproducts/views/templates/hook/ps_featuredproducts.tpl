<section class="featured-products afonica-shop-section clearfix" data-type="popularproducts">
  <div class="afonica-shop-section__head container">
    <h2 class="afonica-shop-section__title">Los más vendidos</h2>
    <a class="afonica-shop-section__link" href="{$urls.pages.category}">Ver todo →</a>
  </div>
  {include
    file="catalog/_partials/productlist.tpl"
    products=$products
    cssClass="row afonica-product-grid"
    productClass="col-xs-12 col-sm-6 col-lg-3"
  }
</section>
