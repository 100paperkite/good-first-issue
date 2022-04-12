import { SiGithub } from 'react-icons/si';

const OAuthModal = (props) => {
  return (
    <div className="fixed h-full w-full flex z-10 backdrop-blur-lg">
      <div className="m-auto">
        <div className="flex flex-col justify-center items-center mx-4 rounded-xl shadow-2xl bg-white p-6 px-9">
          <span className="text-2xl">
            <b>Good first issue</b> <i>finder</i>
          </span>
          <p className="py-4 text-center">
            You need to sign in to GitHub because it uses{' '}
            <a href="https://docs.github.com/en/graphql" className="underline hover:opacity-60">
              GitHub API
            </a>
          </p>
          <button
            type="button"
            className="bg-[#171515] text-white rounded-full shadow-xl px-4 py-3 mt-4 hover:opacity-90 duration-200"
          >
            <a href={`https://github.com/login/oauth/authorize?client_id=${props.clientId}`}>
              <span>
                <SiGithub size={26} className="inline-block my-auto align-middle mr-2" />
                <span className="inline-block align-middle">Sign in GitHub</span>
              </span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthModal;
