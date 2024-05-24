import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className='font-bold'>404 - Page Not Found</h1>
      <p className='font-semibold'>Sorry, we couldn't find the page.</p>
      <Link href="/">
        <p style={{ color: 'blue', textDecoration: 'underline' }}>Go back home</p>
      </Link>
    </div>
  );
}
