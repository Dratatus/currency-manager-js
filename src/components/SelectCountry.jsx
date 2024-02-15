import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material"
import useAxios from "../hooks/useAxios"
export const startFlags = [];

const SelectCountry = (props) => {
  const { value, setValue, label } = props;
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");

  if (loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />
      </Grid>
    )
  }
  if (error) {
    return "Something went wrong!"
  }

  const dataFilter = data.filter(item => "currencies" in item);
  const dataCountries = dataFilter.map(item => {
    if (item.name == "USD" || item.name == "AUD") {
      startFlags.push(item.flags.png)
    }
    return {
      label: `${Object.keys(item.currencies)[0]} - ${item.name.common}`,
      flagUrl: item.flags.png
    };
  });

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={dataCountries}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderOption={(props, option) => (
          <li {...props}>
            <img src={option.flagUrl} alt="" style={{ width: 24, marginRight: 10, verticalAlign: 'middle' }} />
            {option.label}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  )
}

export default SelectCountry