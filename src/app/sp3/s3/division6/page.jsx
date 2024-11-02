import Ranking from '@/components/ranks/globalRanking';
import { divisionIdLeagueS3 } from '@/data/toornamentId';

const DivisionPage = () => {
    return (
        <div className="h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20">
            <Ranking slug={divisionIdLeagueS3['Division 6']} />
        </div>
    );
};

export default DivisionPage;