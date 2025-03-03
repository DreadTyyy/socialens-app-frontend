import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { formattedShortDate } from '../utils/formattedDate';
import { SentimentCount } from '../utils/models/sentiment';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    plugins: {
    //   title: {
    //     display: true,
    //     text: 'Chart.js Bar Chart - Stacked',
    //   },
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };


    
const BarChart = ({value, sentiments}: {
  value: string;
  sentiments: SentimentCount;
}) => {
  const labels: string[] = [];
  const positiveReviews: number[] = [];
  const negativeReviews: number[] = [];

  // TODO: Mengurutkan tanggal minggu terakhir
  const lastDate = new Date(sentiments[sentiments.length - 1].date);
  const filledSentiments: SentimentCount = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(lastDate);
    date.setDate(lastDate.getDate() - i);

    const formattedDate = date.toISOString().split("T")[0];
    const found = sentiments.find(item => item.date === formattedDate); // YYYY-MM-DD
    if (found) {
      filledSentiments.push(found);
    } else {
      filledSentiments.push({date: formattedDate, positive: 0, negative: 0});
    }
  }

  filledSentiments.map(({date, positive, negative}) => {
    labels.push(formattedShortDate(date));
    positiveReviews.push(positive);
    negativeReviews.push(negative);
  });
  const dataset = {
    data: value === "positive" ? positiveReviews : negativeReviews,
    bgColor: value === "positive" ? "#3886DE" : "#DA240C"
  }
  const data = {
    labels,
    datasets: [
      {
        label: value,
        data: dataset.data,
        backgroundColor: dataset.bgColor,
        stack: 'Stack 0',
      },
    //   {
    //     label: 'Dataset 2',
    //     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //     backgroundColor: 'rgb(75, 192, 192)',
    //     stack: 'Stack 0',
    //   },
    ],
  };

  return (
    <Box maxW="100%" maxH="320px">
        <Bar options={options} data={data}/>
      </Box>
  )
}

export default BarChart