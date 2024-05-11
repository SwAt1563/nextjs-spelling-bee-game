
import LocalSwitcher from '@/components/local-switcher';
const WelcomeMessage = () => {

  return (
    <div className="container">
      <LocalSwitcher/>
    </div>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WelcomeMessage />
      {children}
    </>
  );
}