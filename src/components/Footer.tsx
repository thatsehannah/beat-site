const Footer = () => {
  return (
    <footer className='w-full h-auto bg-primary bg-[url("/images/noise.png")] text-center p-4'>
      <p className='text-white text-xs mb-1'>
        &copy; - {new Date().getFullYear()}
        {" - "}
        <a
          href='https://thatsehannah.com'
          target='_blank'
          className='underline'
        >
          TECH3
        </a>
      </p>
      <p className='text-xs text-primary-foreground italic'>
        For listening/demo purposes only.
      </p>
    </footer>
  );
};

export default Footer;
