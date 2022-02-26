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
  test('displays correct title and explanation', async () => {
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
  });
});
