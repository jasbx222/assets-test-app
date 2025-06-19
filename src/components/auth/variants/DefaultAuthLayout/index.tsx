import authImg from '/public/img/auth/auth.png';
import NavLink from 'components/link/NavLink';
import Footer from 'components/footer/FooterAuthDefault';
function Default(props: { maincard: JSX.Element }) {
  const { maincard } = props;
  return (
    <div className="relative flex" dir='rtl'>
      <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:min-h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
        <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
 
          {maincard}
          <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
      
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Default;
