import Ranking from '@/components/ranking';

const ServerPage = ({ params }) => {
  return (
    <div className="h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20">
      <Ranking slug={params.id} />
    </div>
  );
};

export function generateStaticParams() {
  return [{ id: '7536642295841865728' },
  { id: '7536640081084391424' },
  { id: '7536596345101762560' },
  { id: '7536593471567388672' },
  { id: '7536584899792535552' },
  { id: '7536577779904667648' },
  { id: '7536551181308936192' },
  { id: '7536546455548297216' },
  { id: '7536542055986692096' },
  { id: '7536536195342868480', div: '10' },
  { id: '7536519095150829568' },
  { id: '7536501886969577472' }];
}

export default ServerPage;
