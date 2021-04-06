import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import propTypes from 'prop-types';
import { useContext } from 'react';
import supabase from '../utils/initSupabase';
import { AuthContext } from '../context/AuthContext';
import SEO from '../components/SEO';
import Header from '../components/Header';

const SocialLoginButton = ({ Icon, label, provider }) => {
  const { signIn } = useContext(AuthContext);
  return (
    <button type="submit" onClick={() => signIn(provider)} className=" outline-none flex flex-row justify-center items-center border-gray-400 border-2 rounded-full p-1 my-3 w-full hover:border-pink-400">
      {Icon ? (
        <div className="w-10">
          <Icon size={24} />
        </div>
      ) : ''}
      <div className="text-md font-medium text-blue-50">
        {label}
      </div>
    </button>
  );
};

SocialLoginButton.propTypes = {
  Icon: propTypes.func,
  label: propTypes.string.isRequired,
  provider: propTypes.string.isRequired,
};

SocialLoginButton.defaultProps = {
  Icon: <></>,
};

export default function LoginCard() {
  return (
    <>
      <SEO />
      <Header />
      <div className="max-w-xl m-auto p-2 mt-16">
        <div className="m-auto w-full rounded-md py-4 px-6 text-center shadow-2xl max-w-md" style={{ background: '#354353' }}>
          <h3 className="text-6xl text-white font-bold mt-2">Flixplore</h3>
          <div className="m-auto mt-6 max-w-xs">
            <SocialLoginButton Icon={FcGoogle} label="Continue with Google" provider="google" />
            <SocialLoginButton Icon={FaGithub} label="Continue with Github" provider="github" />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  return { props: {} };
}
