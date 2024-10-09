import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchType } from '@types';

const SearchInput = ({ updateParams, placeholder }: SearchType) => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const { search } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const search_value = params.get("search") || "";
        setSearchValue(search_value);
    }, [search]);

    const handleSearchChange = (event: any) => {
        const newSearchValue = event.target.value;
        console.log(newSearchValue);

        setSearchValue(newSearchValue);
        if (updateParams) {
            updateParams({
                search: newSearchValue,
                limit: newSearchValue,
                page: newSearchValue
            });
        }
        const searchParams = new URLSearchParams(search);
        searchParams.set("search", newSearchValue);
        navigate(`?${searchParams}`);
    };

    return (
        <Input
            placeholder={placeholder}
            size="large"
            style={{ maxWidth: 260, minWidth: 20, height: 40, paddingLeft: 10 }}
            onChange={handleSearchChange}
            value={searchValue}
        />
    );
};

export default SearchInput;
