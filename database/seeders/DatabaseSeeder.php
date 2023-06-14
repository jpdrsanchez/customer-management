<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Modules\Customer\Models\Customer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Customer::factory()->count(40)->sequence(
            ['city' => 'Adamantina'],
            ['city' => "Osasco"],
            ['city' => "Oscar Bressane"],
            ['city' => "Osvaldo Cruz"],
            ['city' => "Ourinhos"],
            ['city' => "Ouro Verde"],
            ['city' => "Ouroeste"],
            ['city' => "Santo André"],
            ['city' => "Santo Antônio da Alegria"],
            ['city' => "Santo Expedito"],
            ['city' => "Santópolis do Aguapeí"],
            ['city' => "Santos"],
            ['city' => "São Bento do Sapucaí"],
            ['city' => "São Bernardo do Campo"],
            ['city' => "São Caetano do Sul"],
            ['city' => "São Carlos"],
            ['city' => "São Francisco"]
        )->state(['state' => 'São Paulo'])->create();

        Customer::factory()->count(40)->sequence(
            ['city' => 'Abreulândia'],
            ['city' => "Aguiarnópolis"],
            ['city' => "Angico"],
            ['city' => "Colinas do Tocantins"],
            ['city' => "Colméia"],
            ['city' => "Combinado"],
            ['city' => "Divinópolis do Tocantins"],
            ['city' => "Dois Irmãos do Tocantins"],
            ['city' => "Dueré"],
            ['city' => "Esperantina"],
            ['city' => "Itapiratins"],
            ['city' => "Itaporã do Tocantins"],
            ['city' => "Luzinópolis"]
        )->state(['state' => 'Tocantins'])->create();

        Customer::factory()->count(40)->sequence(
            ['city' => "Almirante Tamandaré do Sul"],
            ['city' => "Alpestre"],
            ['city' => "Angico"],
            ['city' => "Arroio do Meio"],
            ['city' => "Arroio dos Ratos"],
            ['city' => "Barão de Cotegipe"],
            ['city' => "Cerro Grande do Sul"],
            ['city' => "Cerro Largo"],
            ['city' => "Chuí"],
            ['city' => "Crissiumal"],
            ['city' => "Esmeralda"],
            ['city' => "Porto Alegre"],
            ['city' => "Relvado"]
        )->state(['state' => 'Rio Grande do Sul'])->create();
    }
}
