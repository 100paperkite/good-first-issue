import { useEffect, useState } from 'react';

import Card from './IssueCard';

const CardList = (props) => {
  const [items, setItems] = useState([]);

  const { language: currentLanguage } = props;

  useEffect(() => {
    fetch(`sample_data_${currentLanguage}.json`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => console.log(err));
  }, [currentLanguage]);

  return (
    <div className="flex flex-col p-3">
      {items && items.map((item) => <Card {...item} key={item.id} />)}
    </div>
  );
};

export default CardList;
