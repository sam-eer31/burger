import toast from 'react-hot-toast';

export const showDemoToast = (e) => {
  if (e) e.preventDefault();
  toast("This is a sample website. The main focus is the UI design.", {
    icon: '✨',
    style: {
      borderRadius: '12px',
      background: '#1a1a1a',
      color: '#fff',
      border: '1px solid #ff4d4d',
      fontWeight: '500',
    },
  });
};
