/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { expect, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import FallbackImg from '../assets/img/notfound.jpg';
import Card from '../components/Card';
import 'regenerator-runtime/runtime';
import { generateRandomLikes, generateId } from '../utils/utils';
import '@testing-library/jest-dom/extend-expect';

const img = {
  title: 'Perseverance Sol 354',
  id: generateId(),
  date: '2022-02-25',
  explanation:
    "This Navcam mosaic from Perseverance looks out over the car-sized rover's deck, across the floor of Jezero crater on Mars. Frames used to construct the mosaic view were captured on mission sol 354. That corresponds to Earth calendar date February 17, 2022, nearly one Earth year after the rover's landing. With a mass of over 1,000 kilograms, six-wheeled Perseverance is the heaviest rover to touch down on Mars. During its first year of exploration the rover has collected six (so far) rock core samples for later return to planet Earth, served as the base station for Ingenuity, the first helicopter on Mars, and tested MOXIE (Mars Oxygen In-Situ Resource Utilization Experiment), converting some of the Red Planet’s thin, carbon dioxide-rich atmosphere into oxygen.",
  numOfLikes: generateRandomLikes(),
  liked: false,
};

const imgData = [
  {
    title: 'LL Ori and the Orion Nebula',
    id: generateId(),
    date: '2013-02-03',
    explanation:
      "This esthetic close-up of cosmic clouds and stellar winds features LL Orionis, interacting with the Orion Nebula flow. Adrift in Orion's stellar nursery and still in its formative years, variable star LL Orionis produces a wind more energetic than the wind from our own middle-aged Sun. As the fast stellar wind runs into slow moving gas a shock front is formed, analogous to the bow wave of a boat moving through water or a plane traveling at supersonic speed. The small, arcing, graceful structure just above and left of center is LL Ori's cosmic bow shock, measuring about half a light-year across. The slower gas is flowing away from the Orion Nebula's hot central star cluster, the Trapezium, located off the upper left corner of the picture. In three dimensions, LL Ori's wrap-around shock front is shaped like a bowl that appears brightest when viewed along the \"bottom\" edge. The beautiful picture is part of a large mosaic view of the complex stellar nursery in Orion, filled with a myriad of fluid shapes associated with star formation.   Follow APOD on: Facebook (Daily) (Sky) (Spanish) or Google Plus (Daily) (River)",
    numOfLikes: generateRandomLikes(),
    liked: false,
    url: 'https://apod.nasa.gov/apod/image/1302/LLOri_hubble_960.jpg',
  },
  {
    title: 'The Snows of Paranal',
    id: generateId(),
    date: '2011-08-11',
    explanation:
      "Recorded last week, this dawn portrait of snowy mountain and starry sky captures a very rare scenario. The view does feature a pristine sky above the 2,600 meter high mountain Cerro Paranal, but clear skies over Paranal are not at all unusual. That's one reason the mountain is home to the European Southern Observatory's Very Large Telescope. Considering the number of satellites now in orbit, the near sunrise streak of a satellite glinting at the upper left isn't rare either. And the long, bright trail of a meteor can often be spotted this time of year too. The one at the far right is associated with the annual Perseid meteor shower whose peak is expected tomorrow (Friday, August 12). In fact, the rarest aspect of the picture is just the snow. Cerro Paranal rises above South America's Atacama desert, known as the driest place on planet Earth.",
    numOfLikes: generateRandomLikes(),
    liked: false,
    url: 'https://apod.nasa.gov/apod/image/1108/ParanalMeteor_beletsky.jpg',
  },
];

describe('tests image functionality', () => {
  test('displays fallback image in case of loading image error', async () => {
    const view = render(
      <Card
        id={img.id}
        title={img.title}
        date={img.date}
        explanation={img.explanation}
        url={img.url}
        numOfLikes={img.numOfLikes}
        liked={img.liked}
      />
    );

    const cardImg = await view.findByTestId('card-image');
    expect(cardImg.src).toContain(FallbackImg);
  });

  test('displays correct image when loaded', async () => {
    img.url =
      'https://apod.nasa.gov/apod/image/2202/PerseveranceSol354Nav1_1br2_KenKremer1024.jpg';

    const view = render(
      <Card
        id={img.id}
        title={img.title}
        date={img.date}
        explanation={img.explanation}
        url={img.url}
        numOfLikes={img.numOfLikes}
        liked={img.liked}
      />
    );

    const cardImg = await view.findByTestId('card-image');
    expect(cardImg.src).toBe(img.url);
  });
});

describe('tests correct data is rendered to the card', () => {
  test('displays correct title, number of likes, and explanation', async () => {
    const view = render(
      <Card
        id={img.id}
        title={img.title}
        date={img.date}
        explanation={img.explanation}
        url={img.url}
        numOfLikes={img.numOfLikes}
        liked={img.liked}
      />
    );

    const title = await view.findByTestId('title');
    expect(title).toHaveTextContent(img.title);

    const learnMoreBtn = await view.findByTestId('learn-more');
    fireEvent.click(learnMoreBtn);

    const explanation = await view.findByTestId('explanation');
    expect(explanation).toHaveTextContent(img.explanation);

    const numOfLikes = await view.findByTestId('numOfLikes');
    expect(numOfLikes).toHaveTextContent(img.numOfLikes);
  });
});

describe('tests like/unlike updates state', () => {
  const setImgData = jest.fn();

  test('clicking like button updates state', async () => {
    const view = render(
      <Card
        id={imgData[0].id}
        title={imgData[0].title}
        date={imgData[0].date}
        explanation={imgData[0].explanation}
        url={imgData[0].url}
        numOfLikes={imgData[0].numOfLikes}
        liked={imgData[0].liked}
        imgData={imgData}
        setImgData={setImgData}
      />
    );

    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation(imgData => [imgData, setImgData]);

    const outlineHeart = await view.findByTestId('outline-heart');
    expect(outlineHeart).toBeInTheDocument();

    const likeBtn = await view.findByTestId('like-button');
    fireEvent.click(likeBtn);

    expect(setImgData).toBeCalled();
  });
});
