import { PostCode } from "./PostCode";
import { Tweetr } from "./Tweetr";
import { NewCampaign } from "./NewCampaign";
import { Header } from "./Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Shortlinker } from "./Shortlinker";
import { Redirector } from "./Redirector";
import { EmailCampaign } from "./EmailCampaign";
import { Landing } from "./Landing";
import { CreateCampaignLanding } from "./CreateCampaign/CreateCampaignLanding";
import { CreateTweet } from "./CreateCampaign/CreateTweet";
import { CreateEmail } from "./CreateCampaign/CreateEmail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/newcampaign" element={<CreateCampaignLanding />} />

          <Route path="/create/tweet" element={<CreateTweet />} />
          <Route path="/create/email" element={<CreateEmail />} />

          <Route path="/:channel" element={<PostCode />} />

          <Route path="/campaign/:campaign" element={<Redirector />} />
          <Route path="/:target/:hashtag/:template" element={<PostCode />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
