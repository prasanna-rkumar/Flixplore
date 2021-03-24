import { useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import supabase from '../utils/initSupabase';
import { AuthContext } from '../context/AuthContext';

const SocialLoginButton = ({ Icon, label }) => (
  <button type="submit" className="flex flex-row justify-center items-center border-gray-400 border-2 rounded-full p-1 my-3 w-full">
    {Icon ? (
      <div className="w-10">
        <Icon size={24} />
      </div>
    ) : ''}
    <div className="text-md font-medium text-gray-600">
      {label}
    </div>
  </button>
);

SocialLoginButton.propTypes = {
  Icon: propTypes.func,
  label: propTypes.string.isRequired,
};

SocialLoginButton.defaultProps = {
  Icon: <></>,

};

export default function LoginCard() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  const emailLogin = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    setIsLoggedIn(true);
    if (user) router.replace('/');
  };

  const emailSignup = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    await emailLogin({ email, password });
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => res.json());
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-xl m-auto">
      <div className="m-auto bg-white w-full rounded-md py-4 px-6 text-center shadow-2xl max-w-md">
        <h3 className="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 to-teal-500 font-bold mt-2">Flixplore</h3>
        <div className="m-auto mt-6 max-w-xs">
          <div>
            <form onSubmit={handleSubmit(emailSignup)}>
              <input ref={register} className="border-gray-400 border-2 rounded-full py-1 px-4 my-1.5 outline-none focus:ring-2 focus:teal-300 focus:border-transparent w-full" type="email" name="email" placeholder="Email" />
              <input ref={register} className="border-gray-400 border-2 rounded-full py-1 px-4 my-1.5 outline-none focus:ring-2 focus:teal-300 focus:border-transparent w-full" type="password" name="password" placeholder="Password" />
              <div className="text-left mt-1"><a href="/">Forgot password</a></div>
              <input
                type="submit"
                className="rounded-full p-1 mt-3 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg shadow-md cursor-pointer"
                value="Login"
              />
            </form>
          </div>
          <div className="relative h-8 flex flex-row items-center mt-1">
            <hr className="w-full flex-1" />
            <span className="m-2 relative bottom-0.5 text-lg font-medium text-gray-600">or</span>
            <hr className="w-full flex-1" />
          </div>
          <SocialLoginButton Icon={FcGoogle} label="Continue with Google" />
          <SocialLoginButton Icon={FaGithub} label="Continue with Github" />
        </div>
      </div>

    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  return { props: {} };
}
