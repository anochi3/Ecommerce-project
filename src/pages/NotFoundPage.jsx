import { Header } from "../components/Header";
import MobileLogo from '/src/assets/images/mobile-logo.png';
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <>
      <title>Oops! Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href={ MobileLogo }/>
      <Header />
      <div>
        <h1 className="not-found-text">404 - Page not found!</h1>
      </div>
    </>
  )
}