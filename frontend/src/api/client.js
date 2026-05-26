export const uploadPDF = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ reportId: 'mock-123' });
    }, 500);
  });
};
