import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { formattedShortDate } from '../utils/formattedDate';
import { SentimentCount } from '../utils/models/sentiment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
  },
};

const LineChartDouble = ({sentiments}: {sentiments: SentimentCount}) => {
  const labels: string[] = [];
  const positiveData: number[] = [];
  const negativeData: number[] = [];
  sentiments.map(({date, positive, negative}) => {
    labels.push(formattedShortDate(date));
    positiveData.push(positive);
    negativeData.push(negative);
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Positif',
        data: positiveData,
        borderColor: '#3886DE',
        backgroundColor: 'rgba(29, 0, 192, 0.5)',
      },
      {
        label: 'Negatif',
        data: negativeData,
        borderColor: '#DA240C',
        backgroundColor: 'rgba(146, 2, 2, 0.5)',
      },
    ],
  };
  

  return (
    <Box maxW="100%" h={{ base: "full", xl: "320px" }}>
      <Line options={options} data={data}/>
    </Box>
)}

export default LineChartDouble;