import { Text } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../components/ui/data-list";
import { formattedShortFullDate } from "../utils/formattedDate";
import { RestaurantSentiment } from "../utils/models/restaurant";
import { titleCase } from "../utils/titleCase";

const DetailDataReview = ({initialDate, restaurant}: {
  initialDate: string;
  restaurant: RestaurantSentiment;
}) => {
  const datas = [
    {label: "Restoran", value: titleCase(restaurant.title), helpText: ""},
    {label: "Mulai Tanggal", value: formattedShortFullDate(initialDate), helpText: "Tanggal awal dari data review"},
    {label: "Sentimen", value: "", helpText: ""},
    {label: "Positif", value: restaurant.positive.toString(), helpText: "Total review positif"},
    {label: "Negatif", value: restaurant.negative.toString(), helpText: "Total review negatif"},
    {label: "Total data", value: (restaurant.positive + restaurant.negative).toString(), helpText: "Total semua data review"}
]

  return (
    <>
      <Text fontWeight="bold" mb="8px">
        Detail data:
      </Text>
      <DataListRoot orientation="horizontal">
        {datas.map(({label, value, helpText}: 
        {label: string; value: string; helpText: string}) => (
          <DataListItem
            info={helpText}
            key={label}
            label={label}
            value={value}
          />
        ))}
      </DataListRoot>              
    </>
  )
}

export default DetailDataReview;