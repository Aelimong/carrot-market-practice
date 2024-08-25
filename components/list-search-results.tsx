import { TweetType } from "@/types/RiceballTypes";
import ListTweet from "./list-tweet";

interface ListSearchResultsProps {
  searchKeyData: TweetType[];
}
export default function ListSearchResults(props: ListSearchResultsProps) {
  const { searchKeyData } = props;

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {searchKeyData.map((tweets) => (
          <ListTweet key={tweets.id} {...tweets} />
        ))}
      </div>
    </>
  );
}
