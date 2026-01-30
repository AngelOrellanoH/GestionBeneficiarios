import { http } from "../api/http";
import type {
  BeneficiarioCreateDtoApi,
  BeneficiarioResponseDtoApi,
  BeneficiarioUpdateDtoApi,
} from "../types/api/beneficiario.api";
import type { Beneficiario, BeneficiarioCreateDto, BeneficiarioUpdateDto } from "../types/ui/beneficiario.ui";
import { mapBeneficiarioApiToUi } from "../utils/mappers/beneficiario.mapper";


const BASE = "/api/beneficiarios";

function toCreateApi(dto: BeneficiarioCreateDto): BeneficiarioCreateDtoApi {
  return {
    nombres: dto.nombres,
    apellidos: dto.apellidos,
    documentoIdentidadId: dto.documentoIdentidadId,
    numeroDocumento: dto.numeroDocumento,
    fechaNacimiento: dto.fechaNacimiento,
    sexo: dto.sexo,
  };
}

export async function obtenerBeneficiario(id: number): Promise<Beneficiario> {
  const data = await http<BeneficiarioResponseDtoApi>(`${BASE}/${id}`);
  return mapBeneficiarioApiToUi(data);
}

function toUpdateApi(dto: BeneficiarioUpdateDto): BeneficiarioUpdateDtoApi {
  return {
    nombres: dto.nombres,
    apellidos: dto.apellidos,
    documentoIdentidadId: dto.documentoIdentidadId,
    numeroDocumento: dto.numeroDocumento,
    fechaNacimiento: dto.fechaNacimiento,
    sexo: dto.sexo,
  };
}

export async function listarBeneficiarios(): Promise<Beneficiario[]> {
  const data = await http<BeneficiarioResponseDtoApi[]>(BASE);
  return data.map(mapBeneficiarioApiToUi);
}

export async function crearBeneficiario(dto: BeneficiarioCreateDto): Promise<Beneficiario> {
  const data = await http<BeneficiarioResponseDtoApi>(BASE, {
    method: "POST",
    body: toCreateApi(dto),
  });
  return mapBeneficiarioApiToUi(data);
}

export async function actualizarBeneficiario(id: number, dto: BeneficiarioUpdateDto): Promise<Beneficiario> {
  const data = await http<BeneficiarioResponseDtoApi>(`${BASE}/${id}`, {
    method: "PUT",
    body: toUpdateApi(dto),
  });
  return mapBeneficiarioApiToUi(data);
}

export async function eliminarBeneficiario(id: number): Promise<void> {
  await http<void>(`${BASE}/${id}`, { method: "DELETE" });
}
