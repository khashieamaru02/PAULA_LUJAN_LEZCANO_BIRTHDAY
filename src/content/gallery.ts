const photoFiles = [
  'photo-01.jpg',
  'photo-02.jpg',
  'photo-03.png',
  'photo-04.png',
  'photo-05.jpg',
  'photo-06.jpg',
  'photo-07.jpg',
  'photo-08.jpg',
  'photo-09.jpg',
  'photo-10.jpg',
];

export const gallery = photoFiles.map((fileName, index) => ({
  id: index + 1,
  src: `${import.meta.env.BASE_URL}images/${fileName}`,
  fileName,
}));
