import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Country, CountryInput } from "../entities/Country";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return Country.findOne({ where: { code } });
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continent") continent: string): Promise<Country[]> {
    return Country.find({ where: { continent } });
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryInput) data: CountryInput
  ): Promise<Country> {
    const newCountry = new Country();
    Object.assign(newCountry, data);
    await newCountry.save();
    return newCountry;
  }

  @Mutation(() => Country)
  async updateCountry(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => CountryInput) data: CountryInput
  ): Promise<Country> {
    const country = await Country.findOne({ where: { id } });
    if (country !== null) {
      Object.assign(country, data);
      await country.save();
      return country;
    } else {
      throw new Error("Country not found");
    }
  }

  @Mutation(() => Country, { nullable: true })
  async deleteCountry(@Arg("id", () => ID) id: number): Promise<Country | null> {
    const country = await Country.findOneBy({ id });
    if (country !== null) {
      await country.remove();
      Object.assign(country, { id });
      return country;
    } else {
      return null;
    }
  }
} 