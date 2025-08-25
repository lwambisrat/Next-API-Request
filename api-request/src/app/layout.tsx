import './globals.css';
import Footer from './components/footer';
import { NavbarWithSearchProvider } from './components/navBar';

export const metadata = {
  title: 'Moovie',
  description: 'Dynamic Movie Streaming Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <NavbarWithSearchProvider />
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
