import django_filters
from .models import ScrapedItem


class ProductFilter(django_filters.FilterSet):

    min_price = django_filters.NumberFilter(
        field_name="price_history__price", lookup_expr="gte"
    )

    max_price = django_filters.NumberFilter(
        field_name="price_history__price", lookup_expr="lte"
    )

    vendor = django_filters.CharFilter(field_name="vendor", lookup_expr="icontains")

    class Meta:
        model = ScrapedItem
        fields = ["vendor", "min_price", "max_price"]
